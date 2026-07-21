import { InvalidStateObject } from '@/types/state.types';

type Props = {
  obj: InvalidStateObject;
};

export function InvalidObject({ obj }: Props) {
  return (
    <div className="bg-zinc-800 p-2 text-red-500 dark:bg-black dark:text-red-400">
      <p className="mb-2 text-xl font-bold">Invalid Object!</p>
      {obj.err.issues.map((issue) => (
        <div className="font-mono" data-name="issue" key={obj.id}>
          <p>{issue.message}</p>
          {Object.entries(issue)
            .filter(([key]) => key !== 'message')
            .map(([key, val], issueIdx) => (
              <p key={`${obj.id}-${key}-${issueIdx}`}>
                {key}: {JSON.stringify(val)}
              </p>
            ))}
        </div>
      ))}
    </div>
  );
}
