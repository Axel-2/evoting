import { StatGroup, Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import { Card } from 'flowbite-react';

const VoteResult = ({ voteData }) => {
  return (
    <>
      <h4 className='text-neutral-70 text-2xl font-extrabold'>
        Ergebnisse der Abstimmung
      </h4>
      <div className='flex w-full justify-around flex-wrap gap-10 xl:w-2/3'>
        {voteData.map((q) => (
          <VoteResultCard key={q.question} data={q} />
        ))}
      </div>
    </>
  );
};

function VoteResultCard({ data }) {
  const calculatePercentage = (value, total) => {
    if (total === 0) {
      return 0;
    }
    return Math.round((value / total) * 100);
  };

  const totalVotes = data.results.ja + data.results.nein + data.results.neutral;

  return (
    <div className='grow'>
      <Card>
        <h5 className='font-extrabold'>{data.question}</h5>
        <StatGroup>
          <Stat>
            <StatLabel>Ja</StatLabel>
            <StatNumber>
              <span className='text-green-500'>{data.results.ja}</span>
            </StatNumber>
            <StatHelpText>{calculatePercentage(data.results.ja, totalVotes)}%</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Nein</StatLabel>
            <StatNumber>
              <span className='text-red-500'>{data.results.nein}</span>
            </StatNumber>
            <StatHelpText>{calculatePercentage(data.results.nein, totalVotes)}%</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Neutral</StatLabel>
            <StatNumber>
              <span className='text-gray-500'>{data.results.neutral}</span>
            </StatNumber>
            <StatHelpText>{calculatePercentage(data.results.neutral, totalVotes)}%</StatHelpText>
          </Stat>
        </StatGroup>
      </Card>
    </div>
  );
}

export default VoteResult;
