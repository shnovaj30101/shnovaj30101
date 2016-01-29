set nu
set background=dark
set ruler
set ai
syntax on
set ic
set expandtab
set tabstop=4
set shiftwidth=2
set smarttab
set hlsearch
set pastetoggle=<F12>
set incsearch
set ls=2
set statusline=%<%F%h%m%r\ %{strftime(\"%Y/%m/%d-%H:%M\")}%=\ [%l,%v][%p%%]\ ascii:%b\ 
nmap <F5> i#include<iostream><Enter><ENter>using<Space>namespace<Space>std;<Enter><Enter>int<Space>main(<Right><Space>{<Enter><Enter><Esc>ki<Space><Space><Space><Space>
imap { {}<Left>
imap ( ()<Left>
"nmap <Space> i<Space><Esc>
imap ;; <Esc>
