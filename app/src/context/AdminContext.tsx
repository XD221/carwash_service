// export const useLogin = create<TUseLogin>((set) => {
//   const data = useData()
//   const functions = useMethod(data)
//   return {
//     data,
//     functions,
//     setData: (data: Partial<TData> | any, name?: Partial<keyof TData>) =>
//       set((state) => {
//         const newData = name
//           ? {
//               ...(state.data ?? {}),
//               [name]: { ...(state.data![name] as object), ...data },
//             }
//           : { ...state.data, ...data }
//         return { data: newData, functions: useMethod(newData) }
//       }),
//   }
// })
