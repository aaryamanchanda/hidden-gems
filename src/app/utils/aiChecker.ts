import { gems } from "../data/gems";

export interface AiCheckResult {
  status: "pass" | "warn" | "fail";
  scores: {
    authenticity: number;
    uniqueness: number;
    quality: number;
    localness: number;
  };
  issues: string[];
  warnings: string[];
}

export interface SubmissionData {
  name: string;
  location: string;
  city: string;
  description: string;
  localTip: string;
  bestTime: string;
  tags: string[];
  lat?: number;
  lng?: number;
}

// ─── India bounding box (generous) ──────────────────────────────────────────
const INDIA_BOUNDS = {
  latMin: 6.5,
  latMax: 37.5,
  lngMin: 68.0,
  lngMax: 97.5,
};

// ─── Individual Checks ───────────────────────────────────────────────────────

/**
 * Detects tourist-trap language in descriptions.
 * Flags phrases typically used in promotional or tourist-oriented content.
 */
function checkTouristTrap(text: string): { flagged: boolean; matches: string[] } {
  const touristKeywords = [
    "tourist attraction", "must visit", "must-visit", "popular tourist",
    "top attraction", "tripadvisor", "trip advisor", "famous landmark",
    "world-famous", "world famous", "internationally known",
    "number one spot", "#1 spot", "don't miss", "tourist hotspot",
    "highly recommended by", "booking.com", "featured in",
    "voted best", "award winning", "award-winning", "as seen on",
  ];
  const lower = text.toLowerCase();
  const matches = touristKeywords.filter(kw => lower.includes(kw));
  return { flagged: matches.length > 0, matches };
}

/**
 * Detects spam / low-quality writing patterns.
 */
function checkSpam(text: string): { flagged: boolean; reason: string } {
  // Excessive capitalization
  const upperRatio = (text.match(/[A-Z]/g) || []).length / Math.max(text.length, 1);
  if (upperRatio > 0.5) return { flagged: true, reason: "Excessive capitalization detected" };

  // Repetitive words: same word 4+ times
  const words = text.toLowerCase().split(/\s+/);
  const freq: Record<string, number> = {};
  for (const w of words) {
    if (w.length > 3) freq[w] = (freq[w] || 0) + 1;
  }
  const maxFreq = Math.max(0, ...Object.values(freq));
  if (maxFreq >= 4) {
    const repeated = Object.entries(freq).find(([, c]) => c >= 4)?.[0];
    return { flagged: true, reason: `Repetitive word usage: "${repeated}"` };
  }

  // Excessive punctuation / emojis
  const punctRatio = (text.match(/[!?]{2,}/g) || []).length;
  if (punctRatio >= 3) return { flagged: true, reason: "Excessive punctuation (!!! ???)" };

  return { flagged: false, reason: "" };
}

/**
 * Detects promotional URLs embedded in text (spam signal).
 */
function checkUrlSpam(text: string): { flagged: boolean } {
  const urlPattern = /https?:\/\/[^\s]+|www\.[^\s]+/gi;
  return { flagged: urlPattern.test(text) };
}

/**
 * Validates the gem name for minimum quality standards.
 */
function checkNameQuality(name: string): { flagged: boolean; reason: string } {
  const trimmed = name.trim();
  if (trimmed.length < 3) {
    return { flagged: true, reason: "Name is too short (minimum 3 characters)" };
  }
  if (/^\d+$/.test(trimmed)) {
    return { flagged: true, reason: "Name cannot be purely numeric" };
  }
  if (/^[^a-zA-Z]+$/.test(trimmed)) {
    return { flagged: true, reason: "Name must contain at least one letter" };
  }
  return { flagged: false, reason: "" };
}

/**
 * Validates that lat/lng coordinates are within India's bounds.
 * Returns null if coordinates were not provided (optional field).
 */
function checkCoordinates(
  lat?: number,
  lng?: number
): { valid: boolean; reason: string } | null {
  if (lat === undefined || lng === undefined) return null;
  if (isNaN(lat) || isNaN(lng)) {
    return { valid: false, reason: "Coordinates contain invalid numbers" };
  }
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return { valid: false, reason: "Coordinates are outside valid geographic range" };
  }
  const inIndia =
    lat >= INDIA_BOUNDS.latMin &&
    lat <= INDIA_BOUNDS.latMax &&
    lng >= INDIA_BOUNDS.lngMin &&
    lng <= INDIA_BOUNDS.lngMax;
  if (!inIndia) {
    return {
      valid: false,
      reason: `Coordinates (${lat.toFixed(4)}, ${lng.toFixed(4)}) appear to be outside India`,
    };
  }
  return { valid: true, reason: "" };
}

/**
 * Checks description quality — minimum length, generic filler, and substance.
 */
function checkDescriptionQuality(description: string): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;

  if (description.length < 50) {
    issues.push("Description is too short (minimum 50 characters)");
    score -= 40;
  } else if (description.length < 100) {
    issues.push("Description could be more detailed");
    score -= 15;
  }

  const genericPhrases = [
    "nice place", "great place", "good place", "beautiful place",
    "must see", "amazing", "awesome", "check it out", "visit this",
    "you should go", "nice spot", "cool place",
  ];
  const lower = description.toLowerCase();
  const foundGeneric = genericPhrases.filter(p => lower.includes(p));
  if (foundGeneric.length >= 2) {
    issues.push("Description uses generic phrases — add specific local details");
    score -= 20;
  }

  // Reward specific local detail signals
  const localSignals = [
    /\d+(\s?(year|century|decade|year-old))/i,
    /only (locals|residents|regulars)/i,
    /hidden|secret|tucked|lesser.known/i,
    /(open|close[sd]?) at \d/i,
    /walk|trek|climb|navigat/i,
  ];
  const signalCount = localSignals.filter(re => re.test(description)).length;
  if (signalCount === 0 && description.length > 80) {
    issues.push("Add specific local detail: age, access, or unique characteristics");
    score -= 10;
  }

  return { score: Math.max(0, score), issues };
}

/**
 * Detects near-duplicate submissions by comparing name + city.
 */
function checkDuplicate(name: string, city: string): { isDuplicate: boolean; match?: string } {
  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

  const normalizedName = normalize(name);
  const normalizedCity = normalize(city);

  for (const gem of gems) {
    const gemName = normalize(gem.name);
    const gemCity = normalize(gem.city);

    if (gemName === normalizedName && gemCity === normalizedCity) {
      return { isDuplicate: true, match: gem.name };
    }

    // Fuzzy: name contains or is contained by existing gem name (>7 chars)
    if (
      normalizedName.length > 7 &&
      gemCity === normalizedCity &&
      (gemName.includes(normalizedName) || normalizedName.includes(gemName))
    ) {
      return { isDuplicate: true, match: gem.name };
    }
  }
  return { isDuplicate: false };
}

/**
 * Checks local tip authenticity — should feel personal and specific.
 */
function checkLocalTip(localTip: string): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;

  if (localTip.length < 20) {
    issues.push("Local tip is too brief — share a real insider secret");
    score -= 30;
  }

  const genericTips = [
    "just go there", "check it out", "it's great", "you'll love it",
    "worth visiting", "totally worth it", "definitely visit",
  ];
  const lower = localTip.toLowerCase();
  if (genericTips.some(t => lower.includes(t))) {
    issues.push("Local tip sounds generic — add a specific actionable tip");
    score -= 20;
  }

  return { score: Math.max(0, score), issues };
}

// ─── Main Checker ─────────────────────────────────────────────────────────────

export function runAiCheck(data: SubmissionData): AiCheckResult {
  const allIssues: string[] = [];
  const allWarnings: string[] = [];

  // 1. Name quality
  const nameCheck = checkNameQuality(data.name);
  if (nameCheck.flagged) allIssues.push(nameCheck.reason);

  // 2. Coordinate validation (only if provided)
  const coordCheck = checkCoordinates(data.lat, data.lng);
  if (coordCheck !== null && !coordCheck.valid) {
    allIssues.push(coordCheck.reason);
  }

  // 3. Duplicate check
  const dupCheck = checkDuplicate(data.name, data.city);
  if (dupCheck.isDuplicate) {
    allIssues.push(`Possible duplicate: "${dupCheck.match}" already exists in our database`);
  }

  // 4. Tourist-trap language
  const touristCheck = checkTouristTrap(data.description + " " + data.localTip);
  if (touristCheck.flagged) {
    allWarnings.push(`Tourist-oriented language detected: "${touristCheck.matches[0]}"`);
  }

  // 5. URL spam
  const urlSpamDesc = checkUrlSpam(data.description);
  if (urlSpamDesc.flagged) {
    allWarnings.push("Promotional links detected in description — please remove URLs");
  }
  const urlSpamTip = checkUrlSpam(data.localTip);
  if (urlSpamTip.flagged) {
    allWarnings.push("Promotional links detected in local tip — please remove URLs");
  }

  // 6. Spam / quality
  const spamCheckDesc = checkSpam(data.description);
  if (spamCheckDesc.flagged) allIssues.push(spamCheckDesc.reason);

  const spamCheckTip = checkSpam(data.localTip);
  if (spamCheckTip.flagged) allWarnings.push(`Local tip: ${spamCheckTip.reason}`);

  // 7. Description quality
  const qualityCheck = checkDescriptionQuality(data.description);
  allIssues.push(...qualityCheck.issues);

  // 8. Local tip quality
  const tipCheck = checkLocalTip(data.localTip);
  allIssues.push(...tipCheck.issues);

  // ─── Composite scores ────────────────────────────────────────────────────
  const authenticityBase = dupCheck.isDuplicate ? 30 : nameCheck.flagged ? 50 : 95;
  const authenticityPenalty = touristCheck.flagged ? 20 : 0;
  const coordPenalty = coordCheck !== null && !coordCheck.valid ? 25 : 0;
  const authenticity = Math.max(20, authenticityBase - authenticityPenalty - coordPenalty);

  const uniquenessBase = dupCheck.isDuplicate ? 20 : 90;
  const uniqueness = Math.max(20, uniquenessBase - touristCheck.matches.length * 5);

  const quality = qualityCheck.score;
  const localness = tipCheck.score;

  // ─── Overall status ──────────────────────────────────────────────────────
  const avg = (authenticity + uniqueness + quality + localness) / 4;
  const hardFails = [
    dupCheck.isDuplicate,
    nameCheck.flagged,
    coordCheck !== null && !coordCheck.valid,
    allIssues.some(i => i.includes("Excessive") || i.includes("too short")),
  ].filter(Boolean).length;

  let status: AiCheckResult["status"];
  if (hardFails >= 2 || avg < 40) {
    status = "fail";
  } else if (allWarnings.length > 0 || hardFails > 0 || avg < 75) {
    status = "warn";
  } else {
    status = "pass";
  }

  return {
    status,
    scores: { authenticity, uniqueness, quality, localness },
    issues: allIssues,
    warnings: allWarnings,
  };
}
