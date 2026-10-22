export const isValidVocab = (v) =>
  v.vocabulary &&
  v.meaning &&
  v.type &&
  v.example &&
  Array.isArray(v.revisionQuestions) &&
  v.revisionQuestions.length > 0;