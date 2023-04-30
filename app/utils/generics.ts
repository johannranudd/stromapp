import { getItem } from "./storage/localstorage";

export function getElSupportPercentage(
  priceInOre: number,
  estimatedPowerSupportToDate: number
) {
  const total = estimatedPowerSupportToDate + priceInOre;
  const percentageElSupport = (estimatedPowerSupportToDate / total) * 100;
  const percentageYourExpenses = (priceInOre / total) * 100;
  const yourExpensesFinal = percentageYourExpenses.toFixed(2);
  const elSupportFinal = percentageElSupport.toFixed(2);

  return { yourExpensesFinal, elSupportFinal };
}

export function redirectToLoginPage(pathname: string) {
  if (pathname === "/") {
    return;
  } else if (pathname.includes("/login")) {
    return;
  } else if (pathname.includes("/register")) {
    return;
  } else {
    const jwt: string | undefined = getItem("jwt");
    if (typeof jwt !== "string") {
      window.location.href = "/login";
    }
  }
}

export function validateBadgeForm(formData: any) {
  let allValid = true;
  for (const key of Object.keys(formData)) {
    if (!formData[key]) {
      allValid = false;
      console.log("FALSE PROPERY::: ", key);
    }
  }
  return allValid;
}
export function validateRegisterForm(formData: any) {
  let allValid = true;
  for (const key of Object.keys(formData)) {
    if (!formData[key]) {
      allValid = false;
      console.log("FALSE PROPERY::: ", key);
    }
  }
  return allValid;
}

export function getUniqueBadgeArray(badges: any) {
  const uniqueArray = badges.reduce((total: any, current: any) => {
    if (
      total.findIndex(
        (obj: any) =>
          obj.category === current.category && obj.color === current.color
      ) === -1
    ) {
      total.push(current);
    }
    return total;
  }, []);
  return uniqueArray;
}

export function sortByLocalCategory(badges: any) {
  interface Badge {
    category: string;
  }
  const newArr = badges.slice();
  const sortedBadges = newArr.sort((a: Badge, b: Badge) => {
    return a.category.localeCompare(b.category, "nb-NO");
  });
  return sortedBadges;
}
export function sortByLocalName(groups: any) {
  interface Group {
    name: string;
  }
  const newArr = groups.slice();
  const sortedBadges = newArr.sort((a: Group, b: Group) => {
    return a.name.localeCompare(b.name, "nb-NO");
  });
  return sortedBadges;
}
