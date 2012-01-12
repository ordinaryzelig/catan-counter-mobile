# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# All .coffee files in coffee/ will be compiled and placed
# in respective directories (without the coffee/ prefix).
# E.g. coffee/Resources/models/player.coffee -> Resources/models/player.coffee
guard 'coffeescript', {
  :output =>       '.',
  :bare =>         true
} do
  watch %r{coffee/(.+\.coffee)}
end
