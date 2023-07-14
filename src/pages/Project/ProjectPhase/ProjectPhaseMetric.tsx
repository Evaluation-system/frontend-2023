import { FC } from "react";
import { useGetPhaseMetricQuery } from "api/phase.api";

type Props = {
  phaseId: number;
};
const ProjectPhaseMetric: FC<Props> = ({ phaseId }) => {
  //Получение метрик
  const {
    isLoading: isLoadingMetric,
    data: dataMetric,
    error: errorMetric,
  } = useGetPhaseMetricQuery(phaseId);

  return (
    <section>
      {dataMetric && (
        <div className="flex flex-col gap-6">
          <h4>Метрики</h4>
          <ul>
            <li className="flex gap-4">
              <p>QA %:</p>
              <span>{dataMetric.qa}</span>
            </li>
            <li className="flex gap-4">
              <p>PM/AM %:</p>
              <span>{dataMetric.pmAm}</span>
            </li>
            <li className="flex gap-4">
              <p>Bugs %:</p>
              <span>{dataMetric.bugs}</span>
            </li>
            <li className="flex gap-4">
              <p>Risks %:</p>
              <span>{dataMetric.risks}</span>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default ProjectPhaseMetric;
