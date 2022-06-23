const timer = {
  start() {
    const startTime = Date.now();
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const timerComponents = getTimeComponents(deltaTime);
      console.log(timerComponents);
    }, 1000);
  },
};
// timer.start();

//Function from Repeta
function getTimeComponents(time) {
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((time % (1000 * 60)) / 1000);

  return { hours, mins, secs };
}
