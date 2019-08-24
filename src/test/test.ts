import m from '..'

test('errors', async () => {
  // @ts-ignore
  await expect(m('hello')).rejects.toThrow('Expected a Array')
  // @ts-ignore
  await expect(m(['en', 'ja'], 2)).rejects.toThrow('Expected a string')
  // @ts-ignore
  await expect(m(['en', 'ja'], 'app/', 2)).rejects.toThrow('Expected a string')
})
