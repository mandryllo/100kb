const isOpened = ref(false);

function toggleIsOpened() {
  isOpened.value = !isOpened.value;
}

export function useNavMenu() {
  return {
    isOpened,
    toggleIsOpened
  };
}
