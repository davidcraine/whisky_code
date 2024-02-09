module ModalHelper
  def modal_header
    tag.div class: 'modal-header' do
      (tag.h5 "Modal Title", class: 'modal-title') +
        (tag.button '', class: 'btn-close', 'data-bs-dismiss' => 'modal', 'aria-label' => "Close")
    end
  end

  def modal_body
    tag.div class: 'modal-body' do
      tag.p 'Modal text goes here'
    end
  end

  def modal_footer
    tag.div class: 'modal-footer' do
      (tag.button 'Close', class: 'btn btn-secondary', 'data-bs-dismiss' => 'modal') +
        (tag.button 'Save', class: 'btn btn-primary', 'data-bs-dismiss' => 'modal')
    end
  end
end
