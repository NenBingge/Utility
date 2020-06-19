echo off
set /p prefix=«Î ‰»Î«∞◊∫:
for /f %%a in ('dir /b /a *.js') do (
	echo %%a
	ren %%a %prefix%%%a
) 
cd common
for /f %%a in ('dir /b /a *.js') do (
	echo common/%%a
	ren %%a %prefix%%%a
)
cd ../const
for /f %%a in ('dir /b /a *.js') do (
	echo const/%%a
	ren %%a %prefix%%%a
)
pause