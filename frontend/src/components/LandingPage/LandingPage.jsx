import React, { useState, useEffect, useRef } from "react";

const LandingPage = () => {
  const canvasRef = useRef(null);
  const splashScreenRef = useRef(null);
  const splashLeftRef = useRef(null);
  const splashRightRef = useRef(null);
  const progressBarRef = useRef(null);
  const percentageRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  let particles = [];
  let randoSpeed = 5;

  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
      this.speedY =
        Math.random() > 0.5
          ? Math.random() * randoSpeed * -1
          : Math.random() * randoSpeed;
      this.speedX =
        Math.random() > 0.5
          ? Math.random() * randoSpeed * -1
          : Math.random() * randoSpeed;
    }

    reset() {
      this.coordinates = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
      };
    }

    move(ctx) {
      if (this.coordinates.x >= this.canvas.width || this.coordinates.x <= 0) {
        this.speedX *= -1;
      }
      if (this.coordinates.y >= this.canvas.height || this.coordinates.y <= 0) {
        this.speedY *= -1;
      }

      this.coordinates.x += this.speedX;
      this.coordinates.y += this.speedY;

      ctx.beginPath();
      ctx.arc(this.coordinates.x, this.coordinates.y, 2, 0, 2 * Math.PI);
      ctx.stroke();

      for (let i = 0; i < particles.length; i++) {
        let { x, y } = this.coordinates;
        if (
          Math.abs(x - particles[i].coordinates.x) <= 200 &&
          Math.abs(y - particles[i].coordinates.y) <= 150
        ) {
          ctx.strokeStyle = "#03c0ff25";
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(particles[i].coordinates.x, particles[i].coordinates.y);
          ctx.stroke();
        }
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setDimensions = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      let particleTotal = window.innerWidth > 1000 ? 300 : 150;
      particles = [];
      for (let i = 0; i < particleTotal; i++) {
        particles.push(new Particle(canvas));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.move(ctx));
      requestAnimationFrame(animate);
    };

    setDimensions();
    animate();

    window.addEventListener("resize", setDimensions);

    const setup = () => {
      setTimeout(() => setProgress(40), 2000);
      setTimeout(() => setProgress(80), 4000);
      setTimeout(() => {
        setProgress(100);
        setLoading(false);
      }, 5000);
    };

    setup();

    return () => {
      window.removeEventListener("resize", setDimensions);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      splashLeftRef.current.classList.add("active");
      splashRightRef.current.classList.add("active");
      progressBarRef.current.classList.add("complete");
      splashScreenRef.current.classList.add("complete");
    }
  }, [loading]);

  useEffect(() => {
    const percentageTracker = () => {
      if (loading) {
        const { height, top } = progressBarRef.current.getBoundingClientRect();
        const p = Math.ceil((height / window.innerHeight) * 100);
        percentageRef.current.textContent = `${p}%`;
        percentageRef.current.style.transform = `translateY(${
          top - window.innerHeight
        }px)`;
        requestAnimationFrame(percentageTracker);
      }
    };

    percentageTracker();
  }, [loading]);

  return (
    <div>
      <div className="login-section">
        <div className="form-container">
          <LoginFormPage />
          <SignupFormPage />
        </div>
      </div>
      <canvas ref={canvasRef} className="hero__canvas"></canvas>
      <div ref={splashScreenRef} className="splash__screen">
        <div ref={splashLeftRef} className="left"></div>
        <div ref={splashRightRef} className="right"></div>
        <div
          ref={progressBarRef}
          className="progress__bar"
          style={{ height: `${progress}%` }}
        ></div>
        <div ref={percentageRef} className="percentage">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
