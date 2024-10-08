export const PrismaConnectionErrors = {
  P1000: 'Authentication failed against database server',
  P1001: "Can't reach database server.",
  P1002: 'Timed out. Please make sure the database server is running',
  P1003: 'Database name does not exist.',
  P1008: 'Operations timed out after.',
  P1009: 'Database name already exists on the database server',
  P1010: 'User was denied access on the database.',
  P1011: 'Error opening a TLS connection',
  P1017: 'Database server has closed the connection.',
  getMessage: function (code: string) {
    return this[code];
  },
};

export const PrismaValidationErrors = {
  P2000: 'One of provided values is too long.',
  P2001: 'The record searched for in the where condition does not exist.',
  P2002: 'Unique constraint failed.',
  P2003: 'Foreign key constraint failed.',
  P2004: 'A constraint failed on the database.',
  P2005: "The value is invalid for the field's type.",
  P2006: 'The provided value is not valid.',
  P2007: 'Data validation error.',
  P2008: 'Failed to parse the query.',
  P2009: 'Failed to validate the query.',
  P2010: 'Raw query failed.',
  P2011: 'Null constraint violation.',
  P2012: 'Missing a required value.',
  P2013: 'Missing the required argument.',
  P2014: 'The change you are trying to make would violate a required relation.',
  P2015: 'A related record could not be found.',
  P2016: 'Query interpretation error.',
  P2017: 'The records for relation models are not connected.',
  P2018: 'The required connected records were not found.',
  P2019: 'Input error.',
  P2020: 'Value out of range for the type.',
  P2021: 'The table does not exist in the current database.',
  P2022: 'The column does not exist in the current database.',
  P2023: 'Inconsistent column data.',
  P2024: 'Timed out fetching a new connection from the connection pool.',
  P2025: 'Not found required records.',
  P2026: "The current database provider doesn't support a feature query used.",
  P2027: 'Multiple errors occurred on the database during query execution.',
  P2028: 'Transaction API error.',
  P2030: 'Cannot find a full text index to use for the search.',
  P2033: "A number used in the query doesn't fit into a 64 bit signed integer.",
  P2034: 'Transaction failed due to a write conflict or a deadlock.',
  getMessage: function (code: string) {
    return this[code];
  },
};

export enum PrismaErrorCode {
  P1000 = 'P1000',
  P1001 = 'P1001',
  P1002 = 'P1002',
  P1003 = 'P1003',
  P1008 = 'P1008',
  P1009 = 'P1009',
  P1010 = 'P1010',
  P1011 = 'P1011',
  P1017 = 'P1017',
  P2000 = 'P2000',
  P2001 = 'P2001',
  P2002 = 'P2002',
  P2003 = 'P2003',
  P2004 = 'P2004',
  P2005 = 'P2005',
  P2006 = 'P2006',
  P2007 = 'P2007',
  P2008 = 'P2008',
  P2009 = 'P2009',
  P2010 = 'P2010',
  P2011 = 'P2011',
  P2012 = 'P2012',
  P2013 = 'P2013',
  P2014 = 'P2014',
  P2015 = 'P2015',
  P2016 = 'P2016',
  P2017 = 'P2017',
  P2018 = 'P2018',
  P2019 = 'P2019',
  P2020 = 'P2020',
  P2021 = 'P2021',
  P2022 = 'P2022',
  P2023 = 'P2023',
  P2024 = 'P2024',
  P2025 = 'P2025',
  P2026 = 'P2026',
  P2027 = 'P2027',
  P2028 = 'P2028',
  P2030 = 'P2030',
  P2033 = 'P2033',
  P2034 = 'P2034',
}
