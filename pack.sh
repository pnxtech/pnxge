mkdir -p ./dist/pack
muxml-cli --input=./dist/digital40pt.fnt --no-pretty --output=./dist/pack/digital40pt.fnt
muxml-cli --input=./dist/digitaltech60pt.fnt --no-pretty --output=./dist/pack/digitaltech60pt.fnt
muxml-cli --input=./dist/terminal20pt.fnt --no-pretty --output=./dist/pack/terminal20pt.fnt
json-fmt ./dist/game.json > ./dist/pack/game.json
json-fmt ./dist/sounds.json > ./dist/pack/sounds.json
json-fmt ./dist/sprites.json > ./dist/pack/sprites.json
cp ./dist/pack/* ./dist
rm -rf ./dist/pack

