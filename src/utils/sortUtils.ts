import { DashboardTableData } from "../interfaces/challenge";

// 이름순 정렬
const sortByName = (data: DashboardTableData[]): DashboardTableData[] => {
  return data.sort((a, b) => a.name.localeCompare(b.name));
};

// 참여순 정렬
const sortByParticipation = (
  data: DashboardTableData[]
): DashboardTableData[] => {
  return data.sort((a, b) => {
    const aParticipationCount = Object.values(a).filter(
      (value) => value === "참여"
    ).length;
    const bParticipationCount = Object.values(b).filter(
      (value) => value === "참여"
    ).length;

    const aLateParticipationCount = Object.values(a).filter(
      (value) => value === "늦참"
    ).length;
    const bLateParticipationCount = Object.values(b).filter(
      (value) => value === "늦참"
    ).length;

    // 참여순 -> 늦참순으로 정렬
    if (aParticipationCount !== bParticipationCount) {
      return bParticipationCount - aParticipationCount;
    } else {
      return bLateParticipationCount - aLateParticipationCount;
    }
  });
};

// 미참여순 정렬
const sortByNonParticipation = (
  data: DashboardTableData[]
): DashboardTableData[] => {
  return data.sort((a, b) => {
    const aNonParticipationCount = Object.values(a).filter(
      (value) => value === "미참여"
    ).length;
    const bNonParticipationCount = Object.values(b).filter(
      (value) => value === "미참여"
    ).length;

    const aLateParticipationCount = Object.values(a).filter(
      (value) => value === "늦참"
    ).length;
    const bLateParticipationCount = Object.values(b).filter(
      (value) => value === "늦참"
    ).length;

    // 미참여순 -> 늦참순으로 정렬
    if (aNonParticipationCount !== bNonParticipationCount) {
      return bNonParticipationCount - aNonParticipationCount;
    } else {
      return bLateParticipationCount - aLateParticipationCount;
    }
  });
};

export { sortByName, sortByParticipation, sortByNonParticipation };
