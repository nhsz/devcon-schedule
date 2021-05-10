import { useSelectedStore } from '../../store';

const TalkDetails = () => {
  const [selected, talks] = useSelectedStore(state => [state.selected, state.talks]);
  const details = talks.filter((talk: any) => talk.code === selected)[0];

  return (
    <div>{JSON.stringify(details, null, 2)}</div>
    // <Stack mb={4} p={3} border='1px' borderRadius={6} w='600px'>
    //   <Stack mb={4}>
    //     <Heading as='h2' size='lg' mb={2}>
    //       {details?.title ? details.title : ''}
    //     </Heading>
    //     <Text fontWeight={500} fontSize='lg'>
    //       {details.speakers && details.speakers.length > 1
    //         ? details.speakers.map((speaker: any) => (
    //             <span key={speaker.name}>{speaker.name} & </span>
    //           ))
    //         : details.speakers[0].name}
    //     </Text>
    //   </Stack>

    //   <Stack>
    //     <Stack mb={6}>
    //       <Heading as='h3' size='md'>
    //         Description
    //       </Heading>
    //       <Text>{details.description}</Text>
    //     </Stack>

    //     <Stack>
    //       <Heading as='h3' size='md'>
    //         {details.speakers && details.speakers.length > 1 ? 'Biographies' : 'Biography'}
    //       </Heading>
    //       <Stack>
    //         {details.speakers && details.speakers.length > 1
    //           ? details.speakers.map((speaker: any) => (
    //               <Stack key={speaker.name} mb={4}>
    //                 <Text fontWeight={500}>{speaker.name}</Text>
    //                 <Text>{speaker.biography}</Text>
    //               </Stack>
    //             ))
    //           : details.speakers[0].biography}
    //       </Stack>
    //     </Stack>
    //   </Stack>
    // </Stack>
  );
};

export default TalkDetails;
