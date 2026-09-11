import { AstronomicalAnalysis } from '../../types';

export function calculateBirthSeason(dobString: string): AstronomicalAnalysis {
  let month = 6; // Default June if invalid parse
  if (dobString) {
    const parts = dobString.split('-');
    if (parts.length === 3) {
      month = parseInt(parts[1], 10) || 6;
    }
  }

  let season = 'Summer';
  let context = 'Solar zenith alignment';
  let interpretation = '';

  if (month >= 3 && month <= 5) {
    season = 'Spring';
    context = 'Vernal incubation environment';
    interpretation = 'Subject entered planetary existence during Spring. Vernal solar radiation correlates with elevated ambient adaptability.';
  } else if (month >= 6 && month <= 8) {
    season = 'Summer';
    context = 'Maximum thermal exposure';
    interpretation = 'Subject entered planetary existence during Summer. High solar intensity context. The department has absolutely no practical reason to care about this. We care anyway.';
  } else if (month >= 9 && month <= 11) {
    season = 'Autumn';
    context = 'Equinoctial transition phase';
    interpretation = 'Subject born during Autumnal transition. High environmental survival indicators observed during seasonal light reduction.';
  } else {
    season = 'Winter';
    context = 'Low solar intensity & high shelter requirement';
    interpretation = 'Subject born during Winter period. High propensity for seeking thermal shelter and nocturnal indoor dominance.';
  }

  return {
    birthSeason: season,
    solarContext: context,
    interpretation
  };
}
