/*!
 * loadingAnimation 1
 * 版本号: 1.0.0
 * 作者: SQJM
 * 创建日期: 2023-07-31
 *
 * MIT
 */

/**
 * 加载动画 1
 * @param {HTMLElement} control - 加载动画的容器，默认为 document.body
 * @returns {object} - 返回一个对象，包含结束加载动画的方法
 */
const loadingAnimation_1 = (control = document.body) => {
  const info = {
    name: "loadingAnimation 1",
    version: "1.0.0",
    author: "SQJM",
    date: "2023-07-31",
    permission: "MIT"
  };

  const backgroundDiv = document.createElement("div");
  backgroundDiv.setStyle({
    width: "100%",
    height: "100%",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "998", // 设置较低的z-index值
    backgroundColor: "rgba(0,0,0,0.2)",
    border: "none"
  });
  control.appendChild(backgroundDiv);

  const background = document.createElement("div");
  background.classList.add("loadingAnimation-init");
  background.style.border = "none";
  background.innerHTML = `
    <style>
      .loadingAnimation-init{
        z-index: 999;
        width: 100%;
        height: 100%;
        position: fixed;
        opacity: 1;
        left: 0px;
        top: 0px;
        transform: translate(0px, 0px);
        background-color: rgba(100, 255, 255, 1);
        animation: loadingAnimation-init-an 1s;
        transition: all 1s;
      }

      @keyframes loadingAnimation-init-an {
        0% {
          opacity: 0;
          transform: translate(-100%, -100%);
          background-color: rgba(100, 255, 255, 0);
        }

        100% {
          opacity: 1;
          transform: translate(0px, 0px);
          background-color: rgba(100, 255, 255, 1);
        }
      }

      .loadingAnimation-sk-folding-cube {
        margin: 20px auto;
        width: 90px;
        height: 90px;
        position: relative;
        transform: rotateZ(45deg);
        top: 30%;
      }

      .loadingAnimation-sk-folding-cube .loadingAnimation-sk-cube {
        float: left;
        width: 50%;
        height: 50%;
        position: relative;
        transform: scale(1.1);
      }

      .loadingAnimation-sk-folding-cube .loadingAnimation-sk-cube:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #333;
        animation: loadingAnimation-sk-foldCubeAngle 2.4s infinite linear both;
        transform-origin: 100% 100%;
      }

      .loadingAnimation-sk-folding-cube .loadingAnimation-sk-cube2 {
        transform: scale(1.1) rotateZ(90deg);
      }

      .loadingAnimation-sk-folding-cube .loadingAnimation-sk-cube3 {
        transform: scale(1.1) rotateZ(180deg);
      }

      .loadingAnimation-sk-folding-cube .loadingAnimation-sk-cube4 {
        transform: scale(1.1) rotateZ(270deg);
      }

      .loadingAnimation-sk-folding-cube .loadingAnimation-sk-cube2:before {
        animation-delay: 0.3s;
      }

      .loadingAnimation-sk-folding-cube .loadingAnimation-sk-cube3:before {
        animation-delay: 0.6s;
      }

      .loadingAnimation-sk-folding-cube .loadingAnimation-sk-cube4:before {
        animation-delay: 0.9s;
      }

      @-webkit-keyframes loadingAnimation-sk-foldCubeAngle {
        0%, 10% {
          transform: perspective(140px) rotateX(-180deg);
          opacity: 0;
        }
        25%, 75% {
          transform: perspective(140px) rotateX(0deg);
          opacity: 1;
        }
        90%, 100% {
          transform: perspective(140px) rotateY(180deg);
          opacity: 0;
        }
      }

      @keyframes loadingAnimation-sk-foldCubeAngle {
        0%, 10% {
          transform: perspective(140px) rotateX(-180deg);
          opacity: 0;
        }
        25%, 75% {
          transform: perspective(140px) rotateX(0deg);
          opacity: 1;
        }
        90%, 100% {
          transform: perspective(140px) rotateY(180deg);
          opacity: 0;
        }
      }
    </style>
    `;

  const cubeWrapper = document.createElement("div");
  cubeWrapper.classList.add("loadingAnimation-sk-folding-cube");

  const cube1 = document.createElement("div");
  cube1.classList.add("loadingAnimation-sk-cube", "loadingAnimation-sk-cube1");
  cubeWrapper.appendChild(cube1);

  const cube2 = document.createElement("div");
  cube2.classList.add("loadingAnimation-sk-cube", "loadingAnimation-sk-cube2");
  cubeWrapper.appendChild(cube2);

  const cube4 = document.createElement("div");
  cube4.classList.add("loadingAnimation-sk-cube", "loadingAnimation-sk-cube4");
  cubeWrapper.appendChild(cube4);

  const cube3 = document.createElement("div");
  cube3.classList.add("loadingAnimation-sk-cube", "loadingAnimation-sk-cube3");
  cubeWrapper.appendChild(cube3);

  background.appendChild(cubeWrapper);

  const message = document.createElement("p");
  message.style.textAlign = "center";
  message.style.textShadow = "0px 0px 2px #000000";
  message.innerText = "马上就好，请稍等...";
  background.appendChild(message);

  control.appendChild(background);

  // 结束加载动画
  function end() {
    background.style.transform = "translate(50%, 50%)";
    background.style.opacity = "0.2";
    background.style.scale = "0";
    background.style.backgroundColor = "rgba(100, 255, 255, 0.2)";

    background.addEventListener("transitionend", () => {
      backgroundDiv.removePro();
      background.removePro();
    });
  }

  return {
    info,
    end
  };
};
