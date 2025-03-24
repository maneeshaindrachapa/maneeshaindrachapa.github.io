import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
// import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1 style={{ marginBottom: 0, marginTop: '3vh' }}>Hi, I'm</h1>;
  const two = (
    <h2 className="big-heading">
      <strong>Maneesha Indrachapa,</strong>
    </h2>
  );
  const three = <h3 className="big-heading">A Programming Enthusiast</h3>;
  const four = (
    <>
      <p style={{ marginTop: '3vh' }}>
        I’m an enthusiastic software engineer who holds a B.Sc from{' '}
        <a href="http://www.cse.mrt.ac.lk/" target="_blank" rel="noreferrer">
          Computer Science and Engineering department of University of Moratuwa.
        </a>{' '}
        and M.Sc in Big Data analytics from{' '}
        <a href="hhttps://www.rgu.ac.uk/" target="_blank" rel="noreferrer">
          Robert Gordon University,UK
        </a>
        Aspires to work in the field of computer science by providing quality services to the
        clients while enhancing my skills and competencies to suit the ever developing world.
        <br /> Currently, I’m focused on{' '}
        <strong>Cloud native solutions and Identity access and managment</strong> in{' '}
        <a href="https://www.volkswagen-group.com/en/cariad-16008" target="_blank" rel="noreferrer">
          CARIAD SE - Volkswagen Group&nbsp;
        </a>
        .
      </p>
    </>
  );

  const items = [one, two, three, four];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
