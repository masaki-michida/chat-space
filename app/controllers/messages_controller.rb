class MessagesController < ApplicationController
  
  def index
    @groups = User.group(params[:id])
  end
  
end
