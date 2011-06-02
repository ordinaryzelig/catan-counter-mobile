# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# All .coffee files are compiled with the same structure in .compiledJS/.
guard 'coffeescript', {
  :output =>       '.',
  :bare =>         true
} do
  watch %r{coffee/(.+\.coffee)}
end
