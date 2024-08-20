import { useQuery } from "@tanstack/react-query";
import { FlexBox } from "../components/atoms";
import { Frame, Participate } from "../components/organisms";
import useChallengeStore from "../states/ChallengeStore";
import { getParticipationEmailAPI } from "../apis";
import { useState } from "react";

const ParticipationParticipatePage = () => {
  const { challengeId } = useChallengeStore();
  const [pendingEmailList, setPendingEmailList] = useState<string[]>([]);

  const { data: emailData } = useQuery({
    queryKey: ["participation-email", challengeId],
    queryFn: () => getParticipationEmailAPI(),
    staleTime: 60 * 1000,
  });

  return (
    <Frame title="참여자 초대">
      <FlexBox col fullWidth gap={50} style={{ marginTop: "40px" }}>
        <Participate
          gap={50}
          isEdit
          emailList={emailData || []}
          pendingEmailList={pendingEmailList}
          setPendingEmailList={setPendingEmailList}
        />
      </FlexBox>
    </Frame>
  );
};

export default ParticipationParticipatePage;
