import { generateUuidRepository } from "../infrastructure/uuid/uuid";

export const uuidService = {
  generateUid: () => {
    return generateUuidRepository.generateUid();
  },
};
