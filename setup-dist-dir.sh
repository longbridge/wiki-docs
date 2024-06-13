# step 1 create basic dirs
mv ./dist/sitemap.xml ./dist/en/
mv ./dist/404.html ./dist/en/
mv ./dist/.nojekyll ./dist/en/

# step 2 remove duplicated files
cp -rf ./dist/zh-CN/zh-CN/* ./dist/zh-CN/ && rm -rf ./dist/zh-CN/zh-CN && rm -rf ./dist/zh-CN/en && rm -rf ./dist/zh-CN/zh-HK
cp -rf ./dist/zh-HK/zh-HK/* ./dist/zh-HK/ && rm -rf ./dist/zh-HK/zh-HK && rm -rf ./dist/zh-HK/en && rm -rf ./dist/zh-HK/zh-CN
