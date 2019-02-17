set nocompatible

call plug#begin('~/.local/share/nvim/plugged')

" Quality of life
Plug 'tpope/vim-sensible'
Plug 'vim-airline/vim-airline'
Plug 'scrooloose/nerdtree'
Plug 'ctrlpvim/ctrlp.vim'
"Plug 'w0rp/ale'
Plug 'mtth/scratch.vim'

" Text editing
Plug 'junegunn/vim-easy-align'
Plug 'terryma/vim-multiple-cursors'
Plug 'easymotion/vim-easymotion'


" JS support
Plug 'pangloss/vim-javascript'
Plug 'elzr/vim-json'

call plug#end()
filetype plugin indent on

" editor configuration
set background=dark
set nu
set laststatus=2
set pastetoggle=<F2>
set foldlevelstart=99
nnoremap <space> za

" indentation
set tabstop=4
set shiftwidth=4
set noexpandtab

" tabgar
nmap <F8> :TagbarToggle<CR>

" highlight extraneous whitespace
highlight BadWhitespace guifg=red guibg=red
" au BufRead,BufNewFile *.py,*.pyw,*.c,*.h match BadWhitespace /\s\+$/
au BufRead,BufNewFile * match BadWhitespace /\s\+$/

" nerdtree
map <C-n> :NERDTreeToggle<CR>
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif

" vim multiple cursors config
let g:multi_cursor_use_default_mapping=0
let g:multi_cursor_next_key='<C-b>'
let g:multi_cursor_prev_key='<C-p>'
let g:multi_cursor_skip_key='<C-x>'
let g:multi_cursor_quit_key='<Esc>'

" easyalign configuration
xmap ga <Plug>(EasyAlign)
nmap ga <Plug>(EasyAlign)

" orgmode config
let g:org_todo_keywords=['GOAL', 'SCHEDULED', 'ACTIVE', 'TODO', 'DONE', 'PUNTED']
let g:org_agenda_files=['~/.config/org/index.org']
autocmd FileType org set expandtab | set shiftwidth=4 | set tabstop=4

" ctrl-p configuration
let g:ctrlp_map = '<c-p>'
let g:ctrlp_cmd = 'CtrlPMixed'
let g:ctrlp_custom_ignore = '\v[\/](env_*|node_modules|\.(git|hg|svn))$'

" undotree
nnoremap <F5> :UndotreeToggle<cr>

" javascript lang-specific setup
augroup javascript_folding
    au FileType javascript setlocal foldmethod=syntax
augroup END
let g:javascript_plugin_jsdoc = 1
autocmd FileType javascript noremap <buffer>  <c-f> :call JsxBeautify()<cr>
autocmd FileType json noremap <buffer> <c-f> :call JsonBeautify()<cr>
autocmd FileType jsx noremap <buffer> <c-f> :call JsxBeautify()<cr>
autocmd FileType html noremap <buffer> <c-f> :call HtmlBeautify()<cr>
autocmd FileType css noremap <buffer> <c-f> :call CSSBeautify()<cr>
let g:ale_linters = {
\   'javascript': ['eslint'],
\   'python': []
\}

" 80 width color column
highlight ColorColumn ctermbg=black
set colorcolumn=80

" deoplete config
let g:deoplete#enable_at_startup = 1
