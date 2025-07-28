import m from '..'

test('errors', async () => {
  // @ts-expect-error testing invalid argument type
  await expect(m('hello')).rejects.toThrow('Expected a Array')
  // @ts-expect-error testing invalid argument type
  await expect(m(['en', 'ja'], 2)).rejects.toThrow('Expected a string')
  // @ts-expect-error testing invalid argument type
  await expect(m(['en', 'ja'], 'app/', 2)).rejects.toThrow('Expected a string')
})
