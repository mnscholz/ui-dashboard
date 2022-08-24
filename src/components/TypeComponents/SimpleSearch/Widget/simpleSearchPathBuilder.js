import { generateKiwtQuery } from '@k-int/stripes-kint-components';

import isComparatorSpecialCase from '../../utilities/isComparatorSpecialCase';
import tokens from '../../../../tokens';

const simpleSearchPathBuilder = (widgetDef, widgetConf, stripes) => {
  const {
    baseUrl,
    filters: {
      columns: defFilterColumns = []
    } = {},
    matches: {
      columns: defMatchColumns = []
    } = {},
    sort: {
      columns: defSortColumns = [],
    } = {},
  } = widgetDef;

  const {
    configurableProperties: {
      numberOfRows
    } = {},
    filterColumns,
    matches,
    sortColumn
  } = widgetConf;

  // Construct matchKeys string like 'agreementName,description'
  const matchKeys = [];
  for (const [key, value] of Object.entries(matches?.matches ?? {})) {
    // [key,value] should look like [agreementName, true] or [description, false]
    // Only act on match if configured and can find matchColumn in the definition
    const matchColumn = defMatchColumns.find(dmc => dmc.name === key);
    if (value && matchColumn) {
      matchKeys.push(matchColumn.accessPath);
    }
  }

  // Construct from this an object of the shape that generateKiwtQueryParams accepts
  const options = {
    searchKey: matchKeys?.join(','),
  };

  if (numberOfRows) {
    options.perPage = numberOfRows;
  }

  const ns = {
    query: matches?.term
  };

  if (sortColumn?.name) {
    const relevantSortColumn = defSortColumns?.find(dsc => dsc.name === sortColumn.name);
    const path = relevantSortColumn?.sortPath;
    const direction = sortColumn?.sortType ?? 'asc';
    if (path) {
      options.sort = [{ path, direction }];
    }
  }

  if (filterColumns?.length) {
    // For each filter column we need to find the equivalent filter from the definition
    const filters = [];
    filterColumns.forEach(fc => {
      const relevantFilterColumn = defFilterColumns.find(dfc => dfc.name === fc.name);
      // Only continue if we have found the correct fc in the definition and have some rules
      if (relevantFilterColumn && fc.rules?.length) {
        const filterPath = relevantFilterColumn.filterPath;

        const filterValues = [];
        fc.rules.forEach(r => {
          if (isComparatorSpecialCase(r.comparator)) {
            // If we're allowing null the filterString is slightly different
            filterValues.push(`${filterPath} ${r.comparator}`);
          } else {
            // Ensure we're safely encoding all special characters into the filters path, after applying tokens
            const encodedFilterValue = tokens(r.filterValue, stripes);
            filterValues.push(`${filterPath}${r.comparator ?? '=='}${encodedFilterValue}`);
          }
        });

        if (filterValues.length) {
          filters.push({ values: filterValues });
        }
      }
    });

    options.filters = filters;
  }

  // Allow baseUrl to be defined as either `/erm/sas` or `erm/sas`
  const url = baseUrl.charAt(0) === '/' ? baseUrl.substring(1) : baseUrl;

  return `${url}${generateKiwtQuery(options, ns)}`;
};

export default simpleSearchPathBuilder;
