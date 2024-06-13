# step 1 create basic dirs
mkdir -p ./dist/en ./dist/zh-HK ./dist/zh-CN

# step 2 mv default en assets to dist/en
mv ./dist/learn.html ./dist/en/
mv ./dist/sitemap.xml ./dist/en/
mv ./dist/404.html ./dist/en/
mv ./dist/.nojekyll ./dist/en/

# step 3 remove duplicated files
rm -rf ./dist/zh-CN/assets ./dist/zh-HK/assets
cp -rf ./dist/zh-CN/zh-CN/* ./dist/zh-CN/ && rm -rf ./dist/zh-CN/zh-CN
cp -rf ./dist/zh-HK/zh-HK/* ./dist/zh-HK/ && rm -rf ./dist/zh-HK/zh-HK
