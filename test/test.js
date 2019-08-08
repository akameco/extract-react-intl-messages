const m = require('..')

test('errors', async () => {
  await expect(m('hello')).rejects.toThrow('Expected a Array')
  await expect(m(['en', 'ja'], 2)).rejects.toThrow('Expected a string')
  await expect(m(['en', 'ja'], 'app/', 2)).rejects.toThrow('Expected a string')
})
