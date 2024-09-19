import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { PostgreSQL, sql } from "@codemirror/lang-sql";

export const Languages = {
  JAVASCRIPT: 'JavaScript',
  JAVA: 'Java',
  POSTGRESQL: 'PostgreSQL',
  PYTHON: 'Python'
};

export const EXTENSIONS = {};
EXTENSIONS[`${Languages.JAVASCRIPT}`] = javascript({ jsx: true });
EXTENSIONS[`${Languages.JAVA}`] = java();
EXTENSIONS[`${Languages.POSTGRESQL}`] = sql({ dialect: PostgreSQL });
EXTENSIONS[`${Languages.PYTHON}`] = python();