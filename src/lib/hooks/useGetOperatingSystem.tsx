enum OperateSystem {
  win = "Win",
  mac = "Mac",
  linux = "Linux",
}

type OperateSystemType =
  | "Windows"
  | "MacOS"
  | "Linux"
  | "Unknown System"
  | "Ios"
  | "Android";

export const useGetOperatingSystem = () => {
  const userAgent = navigator.userAgent;
  let operatingSystem;

  if (userAgent.indexOf(OperateSystem.win) !== -1) {
    operatingSystem = "Windows";
  } else if (userAgent.indexOf(OperateSystem.mac) !== -1) {
    operatingSystem = "MacOS";
  } else if (/Android/.test(userAgent)) {
    operatingSystem = "Android";
  } else if (/iPhone|iPad/.test(userAgent)) {
    operatingSystem = "Ios";
  } else if (userAgent.indexOf(OperateSystem.linux) !== -1) {
    operatingSystem = "Linux";
  } else {
    operatingSystem = "Unknown System";
  }

  return operatingSystem as OperateSystemType;
};
