FROM alpine:3.7

# install a decent dev toolchain
RUN apk add --no-cache busybox
RUN apk add --no-cache bash
RUN apk add --no-cache git
RUN apk add --no-cache curl
RUN apk add --no-cache neovim

# install some dotfiles
RUN mkdir -p /root/.config/nvim
COPY configs/init.vim	/root/.config/nvim/init.vim
COPY configs/bashrc		/root/.bashrc

# start setting up neovim
RUN curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
RUN nvim +PlugInstall +qa

# put in neofetch for the flex
RUN curl https://raw.githubusercontent.com/dylanaraps/neofetch/master/neofetch -o /usr/local/bin/neofetch && chmod +x /usr/local/bin/neofetch

ENTRYPOINT ["bash", "-c", "cd && nvim && bash"]
