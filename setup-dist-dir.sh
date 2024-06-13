# step 1 create basic dirs
mv ./dist/learn.html ./dist/en/
mv ./dist/sitemap.xml ./dist/en/
mv ./dist/404.html ./dist/en/
mv ./dist/.nojekyll ./dist/en/

# step 2 remove duplicated files
cp -rf ./dist/zh-CN/zh-CN/* ./dist/zh-CN/ && rm -rf ./dist/zh-CN/zh-CN
cp -rf ./dist/zh-HK/zh-HK/* ./dist/zh-HK/ && rm -rf ./dist/zh-HK/zh-HK
