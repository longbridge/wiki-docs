# step 1 create basic dirs
mv ./dist/sitemap.xml ./dist/en/
mv ./dist/learn.html ./dist/en/
mv ./dist/404.html ./dist/en/
mv ./dist/.nojekyll ./dist/en/

# step 2 remove duplicated files
rm -rf ./dist/zh-CN/en ./dist/zh-HK/en
