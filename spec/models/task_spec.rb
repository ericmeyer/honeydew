require 'spec_helper'

describe Task do
  describe 'validations' do
    it('valid') { Task.new(:name => "whatever").should be_valid }
    it('invalid') { Task.new.should_not be_valid }
  end
end
