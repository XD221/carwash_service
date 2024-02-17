const useData = () => {
  const defaultValue = {
    errors: {
      username: false,
      password: false,
    },
  }

  return {
    ...defaultValue,
  }
}

export default useData
