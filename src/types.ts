import PropTypes from 'prop-types';
import {
  QUICKSTART_SUPPORT_LEVELS,
  QUICKSTART_ALERT_TYPES,
} from './data/constants';

// NOTE: while creating a recursive data structure is feasible,
// it is not very performant.
export const link = PropTypes.shape({
  displayName: PropTypes.string.isRequired,
  url: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.array,
});

export const pageContext = PropTypes.shape({
  fileRelativePath: PropTypes.string,
});

export const quickstartDashboard = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  screenshots: PropTypes.arrayOf(PropTypes.string),
});

export const quickstartAlert = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(QUICKSTART_ALERT_TYPES)).isRequired,
  details: PropTypes.string,
});

export const quickstartDocumentation = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
});

export const quickstartInstallPlans = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export const quickstart = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  level: PropTypes.oneOf(Object.values(QUICKSTART_SUPPORT_LEVELS)).isRequired,
  description: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  summary: PropTypes.string,
  iconUrl: PropTypes.string,
  logoUrl: PropTypes.string,
  websiteUrl: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  dashboards: PropTypes.arrayOf(quickstartDashboard),
  alerts: PropTypes.arrayOf(quickstartAlert),
  documentation: PropTypes.arrayOf(quickstartDocumentation),
  installPlans: PropTypes.arrayOf(quickstartInstallPlans),
});

export enum QuickstartSupportLevels {
  NEWRELIC = 'NEWRELIC',
  VERIFIED = 'VERIFIED',
  COMMUNITY = 'COMMUNITY',
}

export enum QuickstartAlertTypes {
  BASELINE = 'BASELINE',
  STATIC = 'STATIC',
}

export interface QuickstartDashboard {
  name: string;
  url: string;
  description: string;
  screenshots: string[];
}

export interface QuickstartAlert {
  name: string;
  url: string;
  details: string;
  type: QuickstartAlertTypes;
}

export interface QuickstartDocumentation {
  name: string;
  url: string;
  description: string;
}

export interface QuickstartInstallPlan {
  id: string;
  name: string;
}

export interface Quickstart {
  id: string;
  name: string;
  title: string;
  level: QuickstartSupportLevels;
  description: string;
  authors: string[];
  summary?: string;
  iconUrl: string;
  packUrl: string;
  logoUrl: string;
  websiteUrl: string;
  dashboards?: QuickstartDashboard[];
  alerts?: QuickstartAlert[];
  documentation?: QuickstartDocumentation[];
  installPlans?: QuickstartInstallPlan[];
  keywords?: string[];
}
