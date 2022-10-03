const MainContainer = () => {
  const [generatedColors, setGeneratedColors] = useState(buildColorList());
  const [displayColor, setDisplayColor] = useState("white");
  const [playState, setPlayState] = useState("drawing");
  const [playedCount, setPlayedCount] = useState(0);

  const onClickInputColorBox = (e, selectedBoxColor) => {
    if (playState === "playing") {
      if (generatedColors[playedCount] === selectedBoxColor) {
        if (playedCount < DISPLAY_COLORS.length - 1) {
          setPlayedCount(playedCount + 1);
        } else {
          setPlayState("won");
        }
      } else {
        setPlayState("lost");
      }
    }
  };

  useEffect(() => {
    if (playState === "drawing") {
      let index = 0;
      const interval = setInterval(() => {
        if (index / 5 >= generatedColors.length) {
          setPlayState("playing");
        } else {
          if (index % 5 === 0) {
            setDisplayColor("white");
          } else {
            setDisplayColor(generatedColors[Math.floor(index / 5)]);
          }
        }
        index++;
      }, COLOR_CHANGE_MILLISECS / 5);
      return () => clearInterval(interval);
    }
  }, [generatedColors, playState]);

  const onPlayAgain = useCallback(() => {
    setGeneratedColors(buildColorList());
    setPlayState("drawing");
    setPlayedCount(0);
  }, []);

  const isStillPlaying = playState === "drawing" || playState === "playing";

  return (
    <>
      <div className="main">
        <div
          id="display-box"
          className="wrapper box display-box"
          style={{
            backgroundColor: displayColor,
          }}
        ></div>
        {playState === "playing" && (
          <div className="wrapper input-box-wrapper">
            <RenderInputColorBox
              color={DISPLAY_COLORS[0]}
              handleOnClick={(event) =>
                onClickInputColorBox(event, DISPLAY_COLORS[0])
              }
            />
            <RenderInputColorBox
              color={DISPLAY_COLORS[1]}
              handleOnClick={(event) =>
                onClickInputColorBox(event, DISPLAY_COLORS[1])
              }
            />
            <RenderInputColorBox
              color={DISPLAY_COLORS[2]}
              handleOnClick={(event) =>
                onClickInputColorBox(event, DISPLAY_COLORS[2])
              }
            />
            <RenderInputColorBox
              color={DISPLAY_COLORS[3]}
              handleOnClick={(event) =>
                onClickInputColorBox(event, DISPLAY_COLORS[3])
              }
            />
          </div>
        )}
      </div>

      {!isStillPlaying && (
        <p>
          Result:{" "}
          <b>{playState === "won" ? "Congrats!!" : "Sorry, Try again :-("}</b>
          <button onClick={onPlayAgain}>Play Again</button>
        </p>
      )}

      <div>
        <p>
          Game Rule: After the left bigger box has completed flashing the
          colors. Please click on the color boxes on the right in the same order
          as the left color box flashed. If you get the order right you win.
          Else you lose. Reload page to start the game again
        </p>
      </div>
    </>
  );
};
