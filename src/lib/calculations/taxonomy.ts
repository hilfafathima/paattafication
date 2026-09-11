import { TraitScores, EmploymentStatus, FictionalTaxonomy } from '../../types';

function sanitizeLatinName(name: string): string {
  if (!name || !name.trim()) return 'specimenus';
  const clean = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!clean) return 'specimenus';
  if (clean.endsWith('a')) return `${clean}e`;
  if (clean.endsWith('us') || clean.endsWith('is')) return clean;
  return `${clean}icus`;
}

export function generateTaxonomy(
  traits: TraitScores,
  status: EmploymentStatus,
  subjectName: string = ''
): FictionalTaxonomy {
  const nameSuffix = sanitizeLatinName(subjectName);
  
  // Find highest trait
  const traitEntries = Object.entries(traits || {});
  const highestTrait = traitEntries.length > 0 
    ? traitEntries.reduce((a, b) => (a[1] > b[1] ? a : b))[0] 
    : 'adaptability';

  let genus = "Periplaneta";
  let traitSpecies = "procrastinatus";
  let commonName = "THE CAREER-RESISTANT COCKROACH";
  let habitat = "Sub-tropical Dormitories & 2 AM Quiet Workspaces";

  const statusVal = status || 'Unemployed';

  if (statusVal === 'Unemployed' || statusVal === 'Professionally Confused') {
    genus = "Periplaneta";
    if (highestTrait === 'deadlineResistance') {
      traitSpecies = "deadline-evadus";
      commonName = "THE DEADLINE-RESISTANT ADAPTIVE ROACH";
    } else if (highestTrait === 'nightActivity') {
      traitSpecies = "nocturnus";
      commonName = "THE LATE-SHIFT NOCTURNAL ROACH";
    } else if (highestTrait === 'survivalInstinct') {
      traitSpecies = "maggi-survivor";
      commonName = "THE NUTRITIONALLY ADAPTIVE UNEMPLOYED SPECIES";
    } else {
      traitSpecies = "procrastinatus";
      commonName = "THE CAREER-RESISTANT COCKROACH";
    }
  } else if (statusVal === 'Student') {
    genus = "Blattella";
    if (highestTrait === 'foodOpportunism') {
      traitSpecies = "maggiensis";
      commonName = "THE DIPLOMA-SEEKING INSTANT NOODLE FORAGER";
    } else {
      traitSpecies = "academicus-evadus";
      commonName = "THE SEMESTER-SURVIVING COCKROACH";
    }
  } else if (statusVal === 'Job Hunting') {
    genus = "Blattella";
    traitSpecies = "linkedinus-resistans";
    commonName = "THE RESUME-DISPENSING ADAPTIVE ROACH";
  } else if (statusVal === 'Self-employed') {
    genus = "Supella";
    traitSpecies = "freelancericus";
    commonName = "THE UNSCHEDULED INDEPENDENT ROACH";
  } else {
    genus = "Nauphoeta";
    traitSpecies = "existentialis";
    commonName = "THE CORPORATE-SURVIVING COCKROACH";
  }

  // Combine genus, subject's personalized latinized name suffix, and trait species
  const species = `${nameSuffix}-${traitSpecies}`;
  const fullName = `${genus} ${species}`;

  return {
    genus,
    species,
    fullName,
    commonName,
    family: "Blattidae (Departmental Fictional Division)",
    habitat
  };
}
