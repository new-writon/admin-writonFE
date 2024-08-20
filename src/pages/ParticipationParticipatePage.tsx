import { useMutation, useQuery } from "@tanstack/react-query";
import { FlexBox, Loading } from "../components/atoms";
import { Frame, Participate } from "../components/organisms";
import useChallengeStore from "../states/ChallengeStore";
import {
  getParticipationEmailAPI,
  postParticipationParticipateAPI,
} from "../apis";
import { useEffect, useState } from "react";

const ParticipationParticipatePage = () => {
  const { challengeId } = useChallengeStore();
  const [pendingEmailList, setPendingEmailList] = useState<string[]>([]);
  const [sendedEmailList, setSendedEmailList] = useState<string[]>([]);

  const { data: emailData } = useQuery({
    queryKey: ["participation-email", challengeId],
    queryFn: () => getParticipationEmailAPI(),
    staleTime: 60 * 1000,
  });

  const { mutateAsync: handleParticipate, isPending } = useMutation({
    mutationFn: () => postParticipationParticipateAPI(pendingEmailList),
    onSuccess: (data) => {
      alert("초대가 완료되었습니다.");
      setSendedEmailList(data);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    setSendedEmailList(emailData);
  }, [emailData]);

  return (
    <Frame title="참여자 초대">
      <FlexBox col fullWidth gap={60} style={{ marginTop: "40px" }}>
        <Participate
          gap={50}
          isEdit
          emailList={sendedEmailList}
          pendingEmailList={pendingEmailList}
          setPendingEmailList={setPendingEmailList}
          handleParticipate={handleParticipate}
        />
        {isPending && <Loading />}
      </FlexBox>
    </Frame>
  );
};

export default ParticipationParticipatePage;
