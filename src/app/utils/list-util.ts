export function listEquals(gauche: MyComparable[], droite: MyComparable[]) {
  if (gauche.length !== droite.length) {
    return false;
  }
  let i = 0;
  let correct = true;
  while (correct && (i < gauche.length)) {
    correct = indexOf(droite, gauche[i]) !== -1;
    i++;
  }
  return correct;
}

export interface MyComparable {
  equals(other: MyComparable);
}

export function indexOf(list: MyComparable[], element: MyComparable) {
  let found = false;
  let index = 0;
  let currentComparable: MyComparable;
  while (!found && (index < list.length)) {
    currentComparable = list[index];
    found = currentComparable.equals(element);
    if (found) {
      console.log('trouvé ' + JSON.stringify(element));
      console.log(' dans ' + JSON.stringify(list));
    }
    index++;
  }
  return (found) ? (index - 1) : -1;
}
