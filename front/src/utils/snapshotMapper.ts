import { SnapshotItem } from "@/types/orders";

export const snapshotMapper = (snapshotJson: string) => {
  return JSON.parse(snapshotJson) as SnapshotItem[];
};
