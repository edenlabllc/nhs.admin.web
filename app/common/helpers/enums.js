export const ENTITY_TYPE = {
  patient: "Пацієнт",
  employee: "Лікар",
  declaration: "Декларація"
};

export const REGISTER_ENTITY_STATUS = {
  PROCESSING: {
    title: "В обробці",
    color: "yellow"
  },
  NOT_FOUND: {
    title: "Не знайдено",
    color: "red"
  },
  MATCHED: {
    title: "Знайдено",
    color: "green"
  }
};

export const REGISTER_STATUS = {
  NEW: {
    title: "Новий",
    color: "green"
  },
  PROCESSING: {
    title: "В обробці",
    color: "yellow"
  },
  PROCESSED: {
    title: "Оброблений",
    color: "gray"
  }
};

export const CONTRACT_STATUS = {
  NEW: {
    title: "Новий",
    color: "yellow"
  },
  DECLINED: {
    title: "Відмінений",
    color: "red"
  },
  TERMINATED: {
    title: "Завершений",
    color: "red"
  },
  APPROVED: {
    title: "Підтверджений",
    color: "blue"
  },
  PENDING_NHS_SIGN: {
    title: "Очікує на підписання від НСЗУ",
    color: "green"
  },
  NHS_SIGNED: {
    title: "Підписаний НСЗУ",
    color: "green"
  },
  SIGNED: {
    title: "Підписаний",
    color: "green"
  },
  VERIFIED: {
    title: "Веріфікований",
    color: "blue"
  }
};
