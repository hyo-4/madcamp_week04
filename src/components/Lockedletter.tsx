import React, { Component, ReactNode } from "react";
import styled from "styled-components";
import lockimage from "../assets/letter.png";
import openimage from "../assets/openletter.png";

interface LockedletterProps {
  personName: string;
  timedata: string;
  groupname: string;
}

interface LockedletterState {
  currentTime: Date;
  remainingTime: string;
}

export default class Lockedletter extends Component<
  LockedletterProps,
  LockedletterState
> {
  private timerID: NodeJS.Timeout | undefined;

  constructor(props: LockedletterProps) {
    super(props);

    const currentTime = new Date();

    this.state = {
      currentTime: currentTime,
      remainingTime: this.calculateRemainingTime(props.timedata, currentTime),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      const currentTime = new Date();
      this.setState({
        currentTime: currentTime,
        remainingTime: this.calculateRemainingTime(
          this.props.timedata,
          currentTime
        ),
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  }

  private calculateRemainingTime(timedata: string, currentTime: Date): string {
    const targetTime = new Date(timedata);
    const timeDifference = targetTime.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
      return "잠금이 풀렸습니다!";
    }

    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    const seconds = Math.floor((timeDifference % 60000) / 1000);

    if (hours === 0) {
      return `${minutes}분 ${seconds}초`;
    }

    return `${hours}시간 ${minutes}분 ${seconds}초`;
  }

  render(): ReactNode {
    return (
      <div>
        <GroupText> {this.props.groupname}</GroupText>
        <NameContainer>
          <img
            src={
              this.state.remainingTime === "잠금이 풀렸습니다!"
                ? openimage
                : lockimage
            }
            alt={
              this.state.remainingTime === "잠금이 풀렸습니다!"
                ? "open"
                : "lock"
            }
            style={{ width: "30px", height: "20px" }}
          />

          <NameText>{this.props.personName}님이 보낸 편지</NameText>
        </NameContainer>

        <Wrapper>{this.state.remainingTime}</Wrapper>
      </div>
    );
  }
}

const Wrapper = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 2.5rem;
`;

const NameContainer = styled.div`
  display: flex;
  margin: 0;
  flex-direction: row;
  padding: 0.5rem;
`;

const NameText = styled.div`
  margin: 0;
  padding: 0;
  margin-left: 1rem;
`;

const GroupText = styled.div`
  margin: 0;
`;
