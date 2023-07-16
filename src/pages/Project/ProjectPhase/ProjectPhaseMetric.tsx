import { FC } from "react";
import { useGetPhaseMetricQuery } from "api/phase.api";
import { AiOutlineEdit } from "react-icons/ai";

type Props = {
  phaseId: number;
};

const ProjectPhaseMetric: FC<Props> = ({ phaseId }) => {
  const {
    data: dataMetric,
    error: errorMetric,
    isLoading: isLoadingMetric,
  } = useGetPhaseMetricQuery(phaseId, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoadingMetric) {
    return <p>Идёт загрузка метрики...</p>;
  }

  if (errorMetric) {
    const errorMessage =
      errorMetric instanceof Error
        ? errorMetric.message
        : "Произошла ошибка при загрузке метрики";
    return <p>{errorMessage}</p>;
  }

  if (!dataMetric) {
    return <p>Данные метрики не найдены</p>;
  }

  const { qa, pmAm, bugs, risks } = dataMetric;
  const data = [
    {
      title: "QA %: ",
      field: qa,
    },
    {
      title: "PM/AM %: ",
      field: pmAm,
    },
    {
      title: "Bugs %:",
      field: bugs,
    },
    {
      title: "Risks %:",
      field: risks,
    },
  ];

  return (
    <section>
      <div className="flex flex-col gap-2">
        <h3>Метрики</h3>
        <ul>
          {data.map((item) => (
            <li key={item.title} className="flex gap-4 items-center">
              <p>{item.title}</p>
              {item.field ? (
                <>
                  {item.field + "%"}
                  <button className="text-gray">
                    <AiOutlineEdit />
                  </button>
                </>
              ) : (
                <p className="text-sm text-gray ">0%</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectPhaseMetric;
