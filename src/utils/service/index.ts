import { getConceptResultsStatistics } from "@/api/index";

export async function getConceptResultsStatisticsApi({
  brandId,
  familyId,
  indicationId,
  periodLength
}) {
  const res = await getConceptResultsStatistics({
    brandId,
    familyId,
    indicationId,
    periodLength
  });
  return Promise.resolve(res);
}
