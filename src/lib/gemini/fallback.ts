import { SubjectRegistration, PhysicsAnalysis, AstronomicalAnalysis, TraitScores, FictionalTaxonomy } from '../../types';

export interface NarrativeResult {
  departmentalObservations: string;
  finalVerdict: string;
  isFallback: boolean;
  fallbackNotice?: string;
}

export function generateLocalNarrative(
  subject: SubjectRegistration,
  physics: PhysicsAnalysis,
  astronomy: AstronomicalAnalysis,
  traits: TraitScores,
  taxonomy: FictionalTaxonomy,
  cciScore: number
): NarrativeResult {
  const obs1 = `The Department of Unnecessary Biology has concluded initial multi-variable computational review for Subject ${subject.name.toUpperCase()}. Under Earth's gravitational acceleration of 9.81 m/s², the subject experiences precisely ${physics.gravitationalForceN} Newtons of downward gravitational load. Coupled with a ${astronomy.birthSeason} solar orientation, the subject occupies a distinct environmental niche characterized by elevated spatial adaptation and persistent inertial resistance to traditional office schedules.`;

  const obs2 = `Behavioral telemetry indicates a Deadline Resistance score of ${traits.deadlineResistance}% alongside a Night Activity index of ${traits.nightActivity}%. In laboratory precedent, organisms exhibiting this precise ratio demonstrate extreme survivability during ambient light reduction and culinary resource scarcity (e.g. surviving multiple academic quarters on instant Maggi noodles). This behavior is formally classified under taxonomy specimen ${taxonomy.fullName} (${taxonomy.commonName}).`;

  const obs3 = `The department would like to reiterate that an overall Cockroach Compatibility Index (CCI™) of ${cciScore}% does not constitute genetic mutation or actual Blattodea ancestry. However, the subject's capacity to remain functional at 2:00 AM while displaying profound resistance to corporate administrative structures represents an extraordinary milestone in unnecessary biological research.`;

  const finalVerdict = `After extensive computational analysis, gravitational vector mapping, solar birth season classification, and several questionable assumptions, the Department hereby confirms that Subject ${subject.name.toUpperCase()} remains legally recognized as human. However, given a Cockroach Compatibility Index of ${cciScore}%, the evidence of functional adaptability is becoming increasingly difficult for senior management to ignore.`;

  return {
    departmentalObservations: `${obs1}\n\n${obs2}\n\n${obs3}`,
    finalVerdict,
    isFallback: true,
    fallbackNotice: "THE DEPARTMENT'S ARTIFICIAL INTELLIGENCE CONSULTANT IS CURRENTLY ON TEA BREAK. LOCAL SCIENTIFIC PROCESSING AUTHORIZED."
  };
}
