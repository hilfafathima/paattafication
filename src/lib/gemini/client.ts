import { SubjectRegistration, PhysicsAnalysis, AstronomicalAnalysis, TraitScores, FictionalTaxonomy } from '../../types';
import { GEMINI_SYSTEM_PROMPT } from './prompts';
import { generateLocalNarrative, NarrativeResult } from './fallback';

export async function fetchGeminiNarrative(
  subject: SubjectRegistration,
  physics: PhysicsAnalysis,
  astronomy: AstronomicalAnalysis,
  traits: TraitScores,
  taxonomy: FictionalTaxonomy,
  cciScore: number,
  userApiKey?: string
): Promise<NarrativeResult & { taxonomy?: FictionalTaxonomy }> {
  const apiKey = userApiKey || (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY;

  if (!apiKey) {
    console.log("No Gemini API Key found. Using local narrative engine with unique taxonomy.");
    const fallback = generateLocalNarrative(subject, physics, astronomy, traits, taxonomy, cciScore);
    return { ...fallback, taxonomy };
  }

  const payload = {
    subject: {
      name: subject.name,
      heightCm: subject.heightCm,
      massKg: subject.massKg,
      dob: subject.dob,
      gender: subject.gender,
      status: subject.employmentStatus || subject.status
    },
    science: {
      gravitationalForce: physics.gravitationalForceN,
      birthSeason: astronomy.birthSeason,
      cciScore,
      classification: taxonomy.fullName,
      commonName: taxonomy.commonName
    },
    traits
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { text: GEMINI_SYSTEM_PROMPT },
                { text: `SUBJECT INVESTIGATION DATA:\n${JSON.stringify(payload, null, 2)}` }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (candidateText) {
      const parsed = JSON.parse(candidateText);
      
      const aiTaxonomy: FictionalTaxonomy | undefined = parsed.taxonomy ? {
        genus: parsed.taxonomy.genus || taxonomy.genus,
        species: parsed.taxonomy.species || taxonomy.species,
        fullName: parsed.taxonomy.fullName || `${parsed.taxonomy.genus || taxonomy.genus} ${parsed.taxonomy.species || taxonomy.species}`,
        commonName: parsed.taxonomy.commonName || taxonomy.commonName,
        family: parsed.taxonomy.family || taxonomy.family,
        habitat: parsed.taxonomy.habitat || taxonomy.habitat
      } : taxonomy;

      return {
        departmentalObservations: parsed.departmentalObservations || '',
        finalVerdict: parsed.finalVerdict || '',
        isFallback: false,
        taxonomy: aiTaxonomy
      };
    } else {
      throw new Error("No text content returned from Gemini");
    }
  } catch (err) {
    console.warn("Gemini fetch failed, using local narrative fallback:", err);
    const fallback = generateLocalNarrative(subject, physics, astronomy, traits, taxonomy, cciScore);
    return { ...fallback, taxonomy };
  }
}
