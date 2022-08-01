import Dashboards from '@components/WhatsIncluded/Dashboards';
import Alerts from '@components/WhatsIncluded/Alerts';
import Documentation from '@components/WhatsIncluded/Documentation';

/**
 * Callback function for sorting data sources and
 * prioritizing default ordering
 * @param {Object} a - Object with react component and length of components
 * @param {Object} b - Object with react component and length of components
 * @returns number
 */
const sortComponents = (a, b) => {
  if (a.count < 1) {
    return 1;
  } else if (b.count < 1) {
    return -1;
  } else {
    return 0;
  }
};

/**
 * Handles sorting Quickstart components by moving components with content
 * to the top of the list.
 * Defaults to standard component ordering.
 * @param {Object} quickstart
 * @returns {Array<Object>} sorted components
 */
const sortedQuickstartComponents = (quickstart) => {
  // get length of all components
  const dashboardLength = quickstart.dashboards?.length ?? 0;
  const alertLength = quickstart.alerts?.length ?? 0;

  // we use documentation for datasources at the moment
  const dataSourceLength = quickstart.documentation?.length ?? 0;

  // sort by length
  const componentsAndCounts = [
    {
      component: Dashboards,
      count: dashboardLength,
    },
    { component: Alerts, count: alertLength },
    { component: Documentation, count: dataSourceLength },
  ];

  return componentsAndCounts.sort(sortComponents);
};

export default sortedQuickstartComponents;
